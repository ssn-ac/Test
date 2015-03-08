using System;
using System.Linq.Expressions;
using AutoMapper;

namespace Technical.Test.Web.Infastructure.Mapper
{
    public static class MapperExtension
    {
        public static T MapTo<T>(this object entity)
        {
            return AutoMapper.Mapper.Map<T>(entity);
        }

        public static IMappingExpression<TSource, TDestination> Ignore<TSource, TDestination>(
            this IMappingExpression<TSource, TDestination> map, Expression<Func<TDestination, object>> selector)
        {
            map.ForMember(selector, config => config.Ignore());
            return map;
        }
    }
}